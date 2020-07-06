CREATE PROCEDURE [WordRepository_GetWordsByLevel]
	@userId NVARCHAR(100),
	@section NVARCHAR,
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
	ON [w].[Id] = [uw].[WordId] AND [uw].[UserId] = @userId
	WHERE [Level] = @section AND [Sublevel] = @level;

	SELECT * FROM @words;
END