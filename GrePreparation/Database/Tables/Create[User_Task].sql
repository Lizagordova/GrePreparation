CREATE TABLE [dbo].[User_Task]
(
	[UserId] NVARCHAR(100) REFERENCES [User] (Id) ON DELETE CASCADE,
	[TaskId] INT,
	[Topic] NVARCHAR(100),
	[Status] NVARCHAR(50),
)