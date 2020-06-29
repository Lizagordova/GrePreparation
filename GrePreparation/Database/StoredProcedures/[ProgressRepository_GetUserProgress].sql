CREATE PROCEDURE [dbo].[ProgressRepository_GetUserProgress]
	@userId NVARCHAR(100),
	@section NVARCHAR(100),
	@topic NVARCHAR(100)
AS
	IF (@section = 'words')
	BEGIN
			SELECT COUNT(*)
			FROM Word WHERE Level = @topic;
			SELECT COUNT(*) FROM User_Word
			WHERE [WordId] IN (select [Id] from [Word] where level = @topic);
	END
RETURN 0