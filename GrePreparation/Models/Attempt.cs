﻿using System;
using Newtonsoft.Json;


namespace GrePreparation.Models
{
	[Serializable]
	public class Attempt
	{
		public int WordId { get; set; }
		public int TaskType { get; set; }
		public int CountOfAttempts { get; set; }
	}
}