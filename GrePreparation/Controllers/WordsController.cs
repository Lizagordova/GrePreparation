using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Permissions;
using Dapper;
using GrePreparation.Extensions;
using GrePreparation.Helpers;
using GrePreparation.Models;
using GrePreparation.Models.QueryPost;
using GrePreparation.Models.UDT;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
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
			var command = new SqlCommand("WordRepository_GetWordsByLevel", connection);
			command.CommandType = CommandType.StoredProcedure;
			var userId = new SqlParameter{ ParameterName = "userId", Value = query.UserId};
			var section = new SqlParameter{ ParameterName = "level", Value = query.Level};
			var level = new SqlParameter{ ParameterName = "sublevel", Value = int.Parse(query.Sublevel)};
			command.Parameters.Add(userId);
			command.Parameters.Add(section);
			command.Parameters.Add(level);
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
			var param = GetParam(query.UserId, query.Level, int.Parse(query.Sublevel));
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
			var command = new SqlCommand("WordRepository_AddOrUpdateUserProgress", connection);
			command.CommandType = CommandType.StoredProcedure;
			var attempts = new List<AttemptUdt>();
			foreach (var word in deserialized.Words)
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
			var tvp = new TableValuedParameter("attempts", "UDT_Attempt");
			tvp.AddGeneticList(attempts);
			var param = new DynamicTvpParameters();
			param.Add("userId", deserialized.UserId);
			param.Add(tvp);
			var result = connection.Execute("WordRepository_AddOrUpdateUserWordProgress", param, commandType: CommandType.StoredProcedure);
			//command.ExecuteNonQuery();
			DatabaseHelper.CloseConnection(connection);
		}

		private DynamicParameters GetParam(string userId, string level, int sublevel)//это тоже параметризировать!!!
		{
			var param = new DynamicParameters();
			param.Add("@userId", userId);
			param.Add("@level", level);
			param.Add("@sublevel", sublevel);

			return param;
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
	}
}