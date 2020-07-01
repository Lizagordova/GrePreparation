using System.Collections.Generic;
using System.Data;
using GrePreparation.Models.QueryPost;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using GrePreparation.Helpers;
using GrePreparation.Models;

namespace GrePreparation.Controllers
{
	public class ProgressController : ControllerBase
	{
		[HttpPost]
		[Route("progress")]
		public Progress GetProgress([FromBody]ProgressQuery query)
		{
			var connection = DatabaseHelper.OpenConnection();
			var command = new SqlCommand("ProgressRepository_GetUserProgress", connection);
			command.CommandType = CommandType.StoredProcedure;
			var userId = new SqlParameter{ ParameterName = "@userId", Value = query.UserId };
			var topic = new SqlParameter{ ParameterName = "@topic", Value = query.Topic };
			var section = new SqlParameter{ ParameterName = "@section", Value = query.Section };
			command.Parameters.Add(userId);
			command.Parameters.Add(section);
			command.Parameters.Add(topic);
			command.ExecuteNonQuery();
			var progress = new Progress();
			using (var reader = command.ExecuteReader())
			{
				while (reader.Read())
				{
					progress.TotalCount = int.Parse(reader[0].ToString());
					progress.UserFinishedTotal = int.Parse(reader[1].ToString());
				}
			}

			DatabaseHelper.CloseConnection(connection);
			return progress;
		}

		[HttpPost]
		[Route("words/progress")]
		public List<Progress> GetWordsProgress([FromBody]ProgressQuery query)
		{
			var connection = DatabaseHelper.OpenConnection();
			var command = new SqlCommand("ProgressRepository_GetWordsProgress", connection);
			command.CommandType = CommandType.StoredProcedure;
			var userId = new SqlParameter{ ParameterName = "@userId", Value = query.UserId };
			var level = new SqlParameter{ ParameterName = "@level", Value = query.Section };
			command.Parameters.Add(userId);
			command.Parameters.Add(level);
			command.ExecuteNonQuery();
			var progress = new List<Progress>();
			using (var reader = command.ExecuteReader())
			{
				while (reader.Read())
				{
					var levelProgress = new Progress();
					levelProgress.Level = int.Parse(reader[0].ToString());
					levelProgress.TotalCount = int.Parse(reader[1].ToString());
					levelProgress.UserFinishedTotal = int.Parse(reader[2].ToString());
					progress.Add(levelProgress);
				}
			}

			DatabaseHelper.CloseConnection(connection);
			return progress; 
		}
	}
}