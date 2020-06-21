using System.Collections.Generic;
using GrePreparation.Models;

namespace GrePreparation.ReadModels
{
	public class DiscreteQuestionTask
	{
		public bool OneAnswer { get; set; }
		public string Text { get; set; }
		public List<Answer> Answers { get; set; }
		public List<Answer> RightAnswers { get; set; }
		public string Explanation { get; set; }
	}
}