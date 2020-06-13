using System.Collections.Generic;
using System.IO;
using GrePreparation.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace GrePreparation.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class TaskController : ControllerBase
	{
		[HttpGet]
		public IEnumerable<Task> Get()
		{
		/*	var streamReader = new StreamReader("./data/tasks/StandardDeviationAndNormalDistribution.json");
			var json = streamReader.ReadToEnd();
			var tasks = JsonConvert.DeserializeObject<List<Models.Task>>(json);

			streamReader.Close();*/
			var testtasks = new List<Task>();
			var task = new Task(){Id=12, TaskText = "12", Answers = new List<Answer>(), RightAnswers = new List<int>(), Explanation = "12", Instruction = "12"};
			testtasks.Add(task);

		return testtasks;
		}
	}
}