using GrePreparation.Models.QueryPost;
using Microsoft.AspNetCore.Mvc;

namespace GrePreparation.Controllers
{
	public class Progress : ControllerBase
	{
		[HttpPost]
		[Route("progress")]
		public Progress GetProgress([FromBody]ProgressQuery query)
		{
			
		}
		
	}
}