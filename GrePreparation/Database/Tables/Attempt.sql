CREATE TABLE [Attempt] (
	[UserId] NVARCHAR(100) REFERENCES [User] ([Id]) ON DELETE CASCADE,
	[WordId] INT REFERENCES [Word] ([Id]) ON DELETE CASCADE,
	[TaskType] INT,
	CONSTRAINT PK_User_Word_TaskType PRIMARY KEY(UserId, WordId, TaskType),
	[CountOfAttempts] INT
)