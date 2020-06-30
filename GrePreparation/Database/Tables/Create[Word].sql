CREATE TABLE Word (
	[Id] INT PRIMARY KEY IDENTITY,
	[Word] NVARCHAR(50),
	[EnglishExplanation] NVARCHAR(250),
	[RussianExplanation] NVARCHAR(250),
	[Image] NVARCHAR(250),
	[Sound] NVARCHAR(250),
	[Synonim] NVARCHAR(50),
	[Level] NVARCHAR(20),
	[Sublevel] INT
)