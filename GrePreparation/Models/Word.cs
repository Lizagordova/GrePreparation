namespace GrePreparation.Models
{
	public class Word
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public string EnglishExplanation { get; set; }
		public string RussianExplanation { get; set; }
		public string Image { get; set; }
		public string Sound { get; set; }
		public string Synonim { get; set; }
		public string Level { get; set; }
		public string Sublevel { get; set; }
		public string Status { get; set; }
	}
}