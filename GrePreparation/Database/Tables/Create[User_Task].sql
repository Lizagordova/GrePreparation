CREATE TABLE [dbo].[User_Task]
(
	[UserId] INT REFERENCES [User] (Id) ON DELETE CASCADE,
	[TaskId] INT,
	[Topic] NVARCHAR(100),
	[Status] NVARCHAR(50),
)