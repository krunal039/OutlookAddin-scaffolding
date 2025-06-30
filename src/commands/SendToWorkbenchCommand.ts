declare const Office: any;

export async function handleSendToWorkbench() {
  try {
    await Office.onReady();
    const item = Office.context.mailbox.item;
    if (item.itemType === Office.MailboxEnums.ItemType.Message) {
      const message = item as any;
      const subject = message.subject;
      const from = message.from && message.from.emailAddress;
      const body = await new Promise<string>((resolve, reject) => {
        message.body.getAsync("text", (result: any) => {
          if (result.status === Office.AsyncResultStatus.Succeeded) {
            resolve(result.value);
          } else {
            reject(result.error);
          }
        });
      });
      // TODO: Send subject, from, and body to Workbench
      console.log({ subject, from, body });
    }
  } catch (error) {
    console.error('Failed to read selected email:', error);
  }
} 