﻿CREATE TABLE Word_Example
(WordId INT REFERENCES Word(Id) ON DELETE CASCADE,
ExampleId INT REFERENCES Example(Id) ON DELETE CASCADE,
CONSTRAINT PR_Word_Example PRIMARY KEY(WordId, ExampleId))