using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace GrePreparation.Models.QueryPost
{
	[Serializable]
	public class WordsQuery
	{
		public List<Word> Words { get; set; }
		public string UserId { get; set; }
	}
}