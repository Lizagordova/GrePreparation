using System.Collections.Generic;
using GrePreparation.enums;

namespace GrePreparation.Models
{
	public class Task
	{
		public int Id { get; set; }
		public string TaskText { get; set; }
		public List<Answer> Answers { get; set; }
		public List<string> RightAnswers { get; set; }
		public string Explanation { get; set; }
		public string Instruction { get; set; }
		public string TaskType { get; set; }
		public string Lebel { get; set; }
	}
}