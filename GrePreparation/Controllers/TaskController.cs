using System.Collections;
using System.Collections.Generic;
using System.IO;
using GrePreparation.Models;
using GrePreparation.ReadModels;
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
		public IEnumerable<Task> GetTasks([FromBody]DataPost data)
		{
			var path = GetPath(data.Topic, data.TaskType, data.Level);
			var streamReader = new StreamReader(path);
			var json = streamReader.ReadToEnd();
			var tasks = JsonConvert.DeserializeObject<List<Models.Task>>(json);

			streamReader.Close();
			return tasks;
		}

		[HttpPost]
		[Route("topictasks/task/vr/discretequestions")]
		public IEnumerable<VR_DiscreteQuestions> GetTasks_VR([FromBody] DataPost data)
		{
			var path = GetPath(data.Topic, data.TaskType, data.Level);
			var streamReader = new StreamReader(path);
			var json = streamReader.ReadToEnd();
			var tasks = JsonConvert.DeserializeObject<List<VR_DiscreteQuestions>>(json);

			streamReader.Close();
			return tasks;
		}

		private string GetPath(string topic, string taskType, string level)
		{
			var path = $"./data/{topic}/{taskType}/{level}.json";
			return path;
		}
	}
}