﻿using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using GrePreparation.Helpers;
using GrePreparation.Models;
using GrePreparation.Models.QueryPost;
using Microsoft.AspNetCore.Mvc;

namespace GrePreparation.Controllers
{
	public class WordsController : ControllerBase
	{
		[HttpPost]
		[Route("/home/words/levels/loadwords")]
		public IEnumerable GetWords([FromBody]WordQuery query)
		{
			var words = new List<Word>();
			
			var connection = DatabaseHelper.OpenConnection();
			var command = new SqlCommand("WordRepository_GetWordsByLevel", connection);
			command.CommandType = CommandType.StoredProcedure;
			var userId = new SqlParameter{ ParameterName = "userId", Value = query.UserId};
			var section = new SqlParameter{ ParameterName = "section", Value = query.Section};
			var level = new SqlParameter{ ParameterName = "level", Value = int.Parse(query.Level)};
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
		
	}
}