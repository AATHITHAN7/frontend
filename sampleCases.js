export const SAMPLE_CASES = [
  {
    label: "PayPal suspension lure",
    data: {
      senderEmail: "security@paypa1-login.com",
      senderName: "PayPal Security",
      replyTo: "",
      subject: "Your account will be suspended!",
      body:
        "Dear Customer,\n\nWe have detected unusual activity on your account. You must verify your account immediately within 24 hours or your account will be suspended.\n\nClick here to verify your identity now!!!\n\nPayPal Security Team",
      urls: [{ href: "http://paypa1-login.com/verify", text: "www.paypal.com/verify" }],
      attachments: ["invoice.pdf.exe"]
    }
  },
  {
    label: "Legitimate GitHub digest",
    data: {
      senderEmail: "notifications@github.com",
      senderName: "GitHub",
      replyTo: "",
      subject: "Weekly digest for your repositories",
      body:
        "Hi there,\n\nHere is a summary of activity across your repositories this week. You can manage your notification settings any time in your account preferences.\n\n— The GitHub Team",
      urls: [{ href: "https://github.com/settings/notifications", text: "Manage notification settings" }],
      attachments: []
    }
  }
];
