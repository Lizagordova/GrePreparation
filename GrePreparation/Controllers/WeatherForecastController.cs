using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using GrePreparation.Models;

namespace GrePreparation.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class WeatherForecastController : ControllerBase
	{
		private static readonly string[] Summaries = new[]
		{
			"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
		};

		private readonly ILogger<WeatherForecastController> _logger;

		public WeatherForecastController(ILogger<WeatherForecastController> logger)
		{
			_logger = logger;
		}

		[HttpGet]
		public IEnumerable<WeatherForecast> Get()
		{
			var rng = new Random();
			return Enumerable.Range(1, 5).Select(index => new WeatherForecast
				{
					Date = DateTime.Now.AddDays(index),
					TemperatureC = rng.Next(-20, 55),
					Summary = Summaries[rng.Next(Summaries.Length)]
				})
				.ToArray();
		}
		
		[HttpPost]
		public IEnumerable<Task> GetTasks([FromBody]string taskType)
		{
			/*var streamReader = new StreamReader("./data/tasks/StandardDeviationAndNormalDistribution.json");
			var json = streamReader.ReadToEnd();
			var tasks = JsonConvert.DeserializeObject<List<Models.Task>>(json);

			streamReader.Close();*/
			var tasks = new List<Task>();
			var task = new Task(){ TaskText = taskType};
			tasks.Add(task);
			return tasks;
		}
	}
}