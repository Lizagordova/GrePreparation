CREATE PROCEDURE [dbo].[ProgressRepository_GetUserProgress]
	@userId NVARCHAR(100),
	@section NVARCHAR(100),
	@topic NVARCHAR(100)
AS
	IF (@section = 'words')
	BEGIN
		DECLARE @totalCount INT;
		DECLARE @userFinishedTotal INT;
		SET @totalCount = (SELECT COUNT(*)
			FROM Word WHERE Level = @topic);
		SET @userFinishedTotal = (SELECT COUNT(*) FROM User_Word
			WHERE [WordId] IN (select [Id] from [Word] where level = @topic));
		SELECT @totalCount, @userFinishedTotal;
	END
RETURN 0