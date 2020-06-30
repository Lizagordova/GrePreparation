using System.Data;
using GrePreparation.Models.QueryPost;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using GrePreparation.Models;

namespace GrePreparation.Controllers
{
	public class ProgressController : ControllerBase
	{
		[HttpPost]
		[Route("progress")]
		public Progress GetProgress([FromBody]ProgressQuery query)
		{
			var connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=GrePreparation;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
			var connection = new SqlConnection(connectionString);
			connection.Open();
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

			connection.Close();
			return progress;
		}
		
	}
}