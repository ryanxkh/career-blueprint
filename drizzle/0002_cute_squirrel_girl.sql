CREATE INDEX "idx_blueprints_user_id" ON "blueprints" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_coaching_sessions_user_id" ON "coaching_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_password_reset_tokens_token_hash" ON "password_reset_tokens" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "idx_session_messages_session_id" ON "session_messages" USING btree ("session_id");