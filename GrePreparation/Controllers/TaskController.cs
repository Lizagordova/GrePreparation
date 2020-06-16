using System.Collections.Generic;
using System.IO;
using GrePreparation.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace GrePreparation.Controllers
{
	public class TaskController : ControllerBase
	{
		[HttpGet]
		[Route("topictasks/task")]
		public IEnumerable<Task> Get()
		{
			var streamReader = new StreamReader("./data/tasks/StandardDeviationAndNormalDistribution.json");
			var json = streamReader.ReadToEnd();
			var tasks = JsonConvert.DeserializeObject<List<Models.Task>>(json);

			streamReader.Close();

		return tasks;
		}
	}
}