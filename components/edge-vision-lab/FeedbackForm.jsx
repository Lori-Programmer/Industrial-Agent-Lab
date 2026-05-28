const feedbackEmail = "machinelori82@gmail.com";

export function FeedbackForm({ scene }) {
  const subject = encodeURIComponent("Edge Vision Lab 反馈");
  const body = encodeURIComponent(
    `你好，我想反馈 Edge Vision Lab。\n\n识别场景：${scene}\n识别是否准确：准确 / 部分准确 / 不准确\n问题说明：\n联系方式：\n`
  );
  const mailto = `mailto:${feedbackEmail}?subject=${subject}&body=${body}`;

  return (
    <article id="feedback" className="edge-panel scroll-mt-24">
      <p className="edge-eyebrow">Feedback</p>
      <h2 className="edge-heading">邮箱反馈</h2>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        网站 Demo 不保存反馈内容。你可以通过邮箱发送识别效果、误检漏检、工程判断建议或合作需求。
      </p>
      <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-200">
        <p>收件邮箱：{feedbackEmail}</p>
        <p>建议包含：识别场景、是否准确、错误说明、联系方式。</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <a className="btn-primary" href={mailto}>
          发送反馈邮件
        </a>
        <a className="btn-secondary" href={`mailto:${feedbackEmail}`}>
          直接联系
        </a>
      </div>
    </article>
  );
}
