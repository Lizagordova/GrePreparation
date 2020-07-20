namespace GrePreparation.Models.UDT
{
	public class WordUdt
	{
		public int Id { get; set; }
		public string Word { get; set; }
		public string EnglishExplanation { get; set; }
		public string RussianExplanation { get; set; }
		public string Image { get; set; }
		public string Sound { get; set; }
		public string Synonim { get; set; }
		public string Level { get; set; }
		public int Sublevel { get; set; }
	}
}