import os

file_path = r'c:\Users\mrmak\OneDrive\Desktop\web-apps\future-myuvce\content\blog\uvce-pg-directory-and-student-accommodation-guide.mdx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace opening tags
content = content.replace('<AccordionGroup>\n<Accordion title="Key Verification Notes & Student Advice">', '## Key Verification Notes & Student Advice')

# Replace closing tags
content = content.replace('</Accordion>\n</AccordionGroup>', '')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
