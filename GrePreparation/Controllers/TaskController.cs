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

		[HttpPost]
		[Route("topictasks/task/gettasks")]
		public IEnumerable<Task> GetTasks([FromBody]DataPost dataPost)
		{
			/*var streamReader = new StreamReader("./data/tasks/StandardDeviationAndNormalDistribution.json");
			var json = streamReader.ReadToEnd();
			var tasks = JsonConvert.DeserializeObject<List<Models.Task>>(json);

			streamReader.Close();*/
			var tasks = new List<Task>();
			var task = new Task()
			{
				TaskText = dataPost.taskType
			};
			tasks.Add(task);
			return tasks;
		}
	}
}