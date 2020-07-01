CREATE PROCEDURE [ProgressRepository_GetWordsProgress]
	@userId NVARCHAR(100),
	@level NVARCHAR(100)
AS
BEGIN
	DECLARE @userProgress [UDT_UserProgress];
	INSERT
	INTO @userProgress(Level, TotalCount, UserFinished)
	SELECT [w].[Sublevel], COUNT([w].[Sublevel]),
		(SELECT COUNT(*) FROM [User_Word] 
		WHERE [Status]='learnt' 
		AND [UserId]=@userId
		AND [WordId] IN 
		(SELECT [Id] FROM [Word] WHERE Sublevel = [w].[Sublevel]))
	FROM Word as w
	WHERE Level=@level
	GROUP BY Sublevel;

SELECT * FROM @userProgress;
END