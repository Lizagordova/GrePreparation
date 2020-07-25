CREATE PROCEDURE WordRepository_AddOrUpdateUserWordProgress
	@userId NVARCHAR(100),
	@attempts [UDT_Attempt] READONLY
AS
BEGIN
	MERGE
	INTO [Attempt] AS [dest]
	USING @attempts AS [src]
	ON [dest].[UserId] = @userId 
		AND [dest].[WordId] = [src].[WordId]
		AND [dest].[TaskType] = [src].[TaskType]
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[CountOfAttempts] = [src].[CountOfAttempts]
	WHEN NOT MATCHED THEN
		INSERT (
			[UserId],
			[WordId],
			[TaskType],
			[CountOfAttempts]
		)
		VALUES (
			@userId,
			[src].[WordId],
			[src].[TaskType],
			[src].[CountOfAttempts]
		);
END