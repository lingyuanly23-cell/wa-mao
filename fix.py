import codecs

with codecs.open('app/taboo/page.tsx', 'r', 'utf-8') as f:
    taboo_lines = f.readlines()

new_lines = []
count = 0

for line in taboo_lines:
    if "const EvolutionAndArchitecture = () => {" in line:
        count += 1
        if count == 2:
            break
    new_lines.append(line)

with codecs.open('app/taboo/page.tsx', 'w', 'utf-8') as f:
    f.writelines(new_lines)

print("Fixed duplicate component in Taboo")
