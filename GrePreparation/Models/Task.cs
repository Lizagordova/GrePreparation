using System.Collections.Generic;

namespace GrePreparation.Models
{
	public class Task
	{
		public int Id { get; set; }
		public string TaskText { get; set; }
		public List<Answer> Answers { get; set; }
		public List<int> RightAnswers { get; set; }
		public string Explanation { get; set; }
		public string Instruction { get; set; }
	}
}