CREATE PROCEDURE [WordRepository_GetWordsByLevel]
	@userId NVARCHAR(100),
	@section NVARCHAR(100),
	@level INT
AS
BEGIN
	DECLARE @words [UDT_Word];
	INSERT 
	INTO @words (
		[Id],
		[Word],
		[EnglishExplanation],
		[RussianExplanation],
		[Image],
		[Sound],
		[Synonim],
		[Status]
	)
	SELECT 
		[Id],
		[Word],
		[EnglishExplanation],
		[RussianExplanation],
		[Image],
		[Sound],
		[Synonim],
		[uw].[Status]
	FROM [Word] as [w]
	JOIN [User_Word] as [uw]
	ON [w].[Id] = [uw].[WordId]
	WHERE [Level] = @section AND [Sublevel] = @level AND [uw].[UserId] = @userId 
	INSERT 
	INTO @words (
		[Id],
		[Word],
		[EnglishExplanation],
		[RussianExplanation],
		[Image],
		[Sound],
		[Synonim],
		[Status]
	)
	SELECT 
		[Id],
		[Word],
		[EnglishExplanation],
		[RussianExplanation],
		[Image],
		[Sound],
		[Synonim],
		'unlearnt'
	FROM [Word] as [w]
	WHERE [Level] = @section AND [Sublevel] = @level AND [Id] NOT IN(select Id from @words)

	SELECT * FROM @words;
END