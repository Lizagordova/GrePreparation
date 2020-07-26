using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using GrePreparation.Extensions;
using GrePreparation.Helpers;
using GrePreparation.Models;
using GrePreparation.Models.QueryPost;
using GrePreparation.Models.UDT;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;


namespace GrePreparation.Controllers
{
	public class WordsController : ControllerBase
	{
		[HttpPost]
		public IEnumerable GetWords([FromBody]WordQuery query)
		{
			var words = new List<Word>();
			
			var connection = DatabaseHelper.OpenConnection();
			var command = GetCommandForWordsSp(connection, query);
			using (var reader = command.ExecuteReader())
			{
				while (reader.Read())
				{
					var word = new Word();
					word.Id = int.Parse(reader[0].ToString());
					word.Text = reader[1].ToString();
					word.EnglishExplanation = reader[2].ToString();
					word.RussianExplanation = reader[3].ToString();
					word.Image = reader[4].ToString();
					word.Sound = reader[4].ToString();
					word.Synonim = reader[5].ToString();
					word.Status = reader[6].ToString();
					words.Add(word);
				}
			}

			DatabaseHelper.CloseConnection(connection);
			return words;
		}

		[HttpPost]
		[Route("/home/words/levels/loadwords")]
		public JsonResult GetWordsForUserByUserLevel([FromBody]WordQuery query)
		{
			var connection = DatabaseHelper.OpenConnection();
			var param = GetParamForGettingWordsForUserByLevel(query.UserId, query.Level, int.Parse(query.Sublevel));
			var data = connection.QueryMultiple("WordRepository_GetWordsForUserByLevel", param, commandType: CommandType.StoredProcedure);
			var wordsUdts = data.Read<WordUdt>().ToList();
			var attemptsUdts = data.Read<AttemptUdt>().ToList();
			var words = GetListWords(wordsUdts, attemptsUdts);
			
			DatabaseHelper.CloseConnection(connection);
			var serializedWords = JsonConvert.SerializeObject(words);
			return new JsonResult(serializedWords);
		}

		[HttpPost]
		[Route("/home/words/levels/updatedatabase")]
		public void UpdateDatabase([FromBody]dynamic wordsQuery)
		{
			var connection = DatabaseHelper.OpenConnection();
			var json = wordsQuery.ToString();
			WordsQuery deserialized = JsonConvert.DeserializeObject<WordsQuery>(json);
			var attempts = GetListAttemptUdts(deserialized.Words);
			var dataTable = GetDataTable(attempts);
			var command = GetCommandForAddOrUpdateUserWordProgress(connection, dataTable, deserialized.UserId);
			command.ExecuteNonQuery();
			DatabaseHelper.CloseConnection(connection);
		}

		private DynamicParameters GetParamForGettingWordsForUserByLevel(string userId, string level, int sublevel)//это тоже параметризировать!!!
		{
			var param = new DynamicParameters();
			param.Add("@userId", userId);
			param.Add("@level", level);
			param.Add("@sublevel", sublevel);

			return param;
		}

		private DataTable GetDataTable(List<AttemptUdt> attempts)
		{
			var dataTable = new DataTable();
			dataTable.Columns.Add("WordId");
			dataTable.Columns.Add("TaskType");
			dataTable.Columns.Add("CountOfAttempts");
			foreach (var attempt in attempts)
			{
				dataTable.Rows.Add(attempt.WordId, attempt.TaskType, attempt.CountOfAttempts);
			}

			return dataTable;
		}

		private List<AttemptUdt> GetListAttemptUdts(List<Word> words)
		{
			var attempts = new List<AttemptUdt>();
			foreach (var word in words)
			{
				foreach (var attempt in word.Attempts)
				{
					var attemptUdt = new AttemptUdt()
					{
						WordId = attempt.WordId,
						TaskType = attempt.TaskType,
						CountOfAttempts = attempt.CountOfAttempts
					};
					attempts.Add(attemptUdt);
				}
			}

			return attempts;
		}
		private List<Word> GetListWords(List<WordUdt> wordUdts, List<AttemptUdt> attemptUdts)//ТУТ ТОЧНО ВСЁ ПЕРЕДЕЛАТЬ К МАППЕРУ
		{
			var words = new List<Word>();
			foreach (var wordUdt in wordUdts)
			{
				var word = new Word()
				{
					Id = wordUdt.Id,
					Text = wordUdt.Word,
					EnglishExplanation = wordUdt.EnglishExplanation,
					RussianExplanation = wordUdt.RussianExplanation,
					Image = wordUdt.Image,
					Sound = wordUdt.Sound,
					Synonim = wordUdt.Synonim,
					Level = wordUdt.Level,
					Sublevel = wordUdt.Sublevel
				};
				words.Add(word);
			}

			for (var i = 0; i < words.Count; i++)
			{
				foreach (var attemptUdt in attemptUdts)
				{
					if (words[i].Id != attemptUdt.WordId) continue;
					var attempt = new Attempt()
					{
						CountOfAttempts = attemptUdt.CountOfAttempts,
						TaskType = attemptUdt.TaskType,
						WordId = attemptUdt.WordId
					};
					words[i].Attempts.Add(attempt);
				}
			}

			return words;
		}

		private SqlCommand GetCommandForAddOrUpdateUserWordProgress(SqlConnection connection, DataTable dataTable, string id)
		{
			var command = new SqlCommand("WordRepository_AddOrUpdateUserWordProgress", connection);
			command.CommandType = CommandType.StoredProcedure;
			var userId = new SqlParameter{ ParameterName = "userId", Value = id };
			command.Parameters.Add(userId);
			command.Parameters.AddWithValue("@attempts", dataTable);
			command.Parameters["@attempts"].TypeName = "UDT_Attempt";
			return command;
		}

		private SqlCommand GetCommandForWordsSp(SqlConnection connection, WordQuery query)
		{
			var command = new SqlCommand("WordRepository_GetWordsByLevel", connection);
			command.CommandType = CommandType.StoredProcedure;
			var userId = new SqlParameter{ ParameterName = "userId", Value = query.UserId};
			var section = new SqlParameter{ ParameterName = "level", Value = query.Level};
			var level = new SqlParameter{ ParameterName = "sublevel", Value = int.Parse(query.Sublevel)};

			command.Parameters.Add(userId);
			command.Parameters.Add(section);
			command.Parameters.Add(level);
			return command;
		}
	}
}