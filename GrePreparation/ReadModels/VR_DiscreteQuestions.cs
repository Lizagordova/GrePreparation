using System.Collections.Generic;

namespace GrePreparation.ReadModels
{
	public class VR_DiscreteQuestions
	{
		public string Instruction { get; set; }
		public List<DiscreteQuestionTask> Tasks { get; set; }
	}
}