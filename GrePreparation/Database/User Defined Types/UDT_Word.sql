CREATE TYPE [UDT_Word] AS TABLE (
	[Id] INT,
	[Word] NVARCHAR(50),
	[EnglishExplanation] NVARCHAR(250),
	[RussianExplanation] NVARCHAR(250),
	[Image] NVARCHAR(250),
	[Sound] NVARCHAR(250),
	[Synonim] NVARCHAR(50),
	[Status] NVARCHAR(50)
);