CREATE PROCEDURE [dbo].[WordRepository_GetWordsForUserByLevel]
	@userId NVARCHAR(100),
	@level NVARCHAR(20),
	@sublevel INT
AS
BEGIN
	DECLARE @wordIds TABLE (
		[Id] INT
		);
	INSERT
	INTO @wordIds
	SELECT Id FROM Word
	WHERE [Level] = @level AND [Sublevel] = @sublevel
	UNION 
	SELECT Id FROM Word
	WHERE [Level] = @level AND [Sublevel] = @sublevel
	AND [Id] IN (
		SELECT [WordId] FROM [User_Word]
		WHERE [UserId] = @userId AND [Status] != 'learnt'
	);

	DECLARE @attempts [UDT_Attempt];

	INSERT
	INTO @attempts
	SELECT
		[WordId],
		[TaskType],
		[CountOfAttempts]
	FROM Attempt WHERE [WordId] IN(SELECT [Id] FROM @wordIds)
	AND [UserId] = @userId;

	SELECT * FROM Word
	WHERE [Level] = @level AND [Sublevel] = @sublevel
	AND [Id] IN (SELECT [Id] FROM @wordIds);
	SELECT * FROM @attempts;
END