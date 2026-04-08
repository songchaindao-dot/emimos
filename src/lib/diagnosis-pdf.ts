const escapePdfText = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const wrapLines = (value: string, maxLength = 92) => {
  const words = value.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxLength) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
};

export const downloadDiagnosisPdf = (title: string, sections: Array<{ heading: string; lines: string[] }>) => {
  if (typeof window === "undefined") return;

  const contentLines: string[] = [title, ""];
  sections.forEach((section) => {
    contentLines.push(section.heading);
    section.lines.forEach((line) => {
      wrapLines(line).forEach((wrapped) => contentLines.push(`- ${wrapped}`));
    });
    contentLines.push("");
  });

  const streamRows = contentLines
    .map((line, index) => {
      const escaped = escapePdfText(line);
      if (index === 0) {
        return `BT /F1 13 Tf 50 790 Td (${escaped}) Tj ET`;
      }
      return `BT /F1 11 Tf 50 ${780 - index * 14} Td (${escaped}) Tj ET`;
    })
    .join("\n");

  const objects: string[] = [];
  objects.push("1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj");
  objects.push("2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj");
  objects.push(
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj",
  );
  objects.push(`4 0 obj << /Length ${streamRows.length} >> stream\n${streamRows}\nendstream endobj`);
  objects.push("5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj");

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];
  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${offsets[i].toString().padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "emimos-business-diagnosis.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
