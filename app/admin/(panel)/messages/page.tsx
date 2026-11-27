import { connection } from "next/server";
import { Inbox } from "../../Inbox";
import { Page } from "../../ui";
import { readDb } from "@/lib/db";

export default async function MessagesAdmin() {
  // read the store on every visit, so a message that just arrived is never missing from a build-time snapshot
  await connection();
  const messages = (await readDb()).messages;
  const fresh = messages.filter((m) => !m.handled).length;
  return (
    <Page eyebrow="Contact form" title="Messages" lead={messages.length ? `${fresh} new of ${messages.length}. Newest first.` : "Messages sent from the Contact page."}>
      <Inbox messages={messages} />
    </Page>
  );
}
