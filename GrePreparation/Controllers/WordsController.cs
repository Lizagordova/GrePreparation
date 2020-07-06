using System.Collections;
using System.Collections.Generic;
using GrePreparation.Helpers;
using GrePreparation.Models;
using GrePreparation.Models.QueryPost;
using Microsoft.AspNetCore.Mvc;

namespace GrePreparation.Controllers
{
	public class WordsController : ControllerBase
	{
		[HttpPost]
		[Route("/home/words/levels/word/loadwords")]
		public IEnumerable GetWords([FromBody]WordQuery query)
		{
			var connection = DatabaseHelper.OpenConnection();
			var words = new List<Word>();
			DatabaseHelper.CloseConnection(connection);
			return words;
		}
		
	}
}