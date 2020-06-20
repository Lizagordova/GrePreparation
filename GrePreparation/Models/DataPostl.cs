using System.ComponentModel.DataAnnotations;

namespace GrePreparation.Models
{
	public class DataPost
	{
		[Required] public string taskType { get; set; }
	}
}