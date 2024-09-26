CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`firstname` text NOT NULL,
	`lastname` text NOT NULL,
	`password_hash` text NOT NULL,
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP)
);
