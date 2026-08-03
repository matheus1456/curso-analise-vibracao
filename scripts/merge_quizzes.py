#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mescla as conversões de MC (partes 1, 2, 3) nos módulos originais de
data/content.js (classic, 22 módulos) e data/lube_content.js (mlub1-8;
mlub9-12 já estão no schema novo e são preservados como estão).

Regra: cada módulo tinha 1 quiz-block, exceto m16 que tem 2 (3+4 perguntas).
Substituímos mod["quizzes"][i]["questions"] pela lista de perguntas no novo
schema (removendo a chave "answers", agora obsoleta).
"""
import json, re

with open("/tmp/_quiz_conversion_1.json", encoding="utf-8") as f:
    C1 = json.load(f)
with open("/tmp/_quiz_conversion_2.json", encoding="utf-8") as f:
    C2 = json.load(f)
with open("/tmp/_quiz_conversion_3.json", encoding="utf-8") as f:
    C3 = json.load(f)

CLASSIC = {**C1, **C2}  # m0..m21 except m17 (no quizzes)
LUBE = C3  # mlub1..mlub8

def apply_conversion(modules, conversion_map):
    by_id = {m["id"]: m for m in modules}
    for mid, questions in conversion_map.items():
        mod = by_id.get(mid)
        if mod is None:
            print("WARN: module not found:", mid)
            continue
        quizzes = mod.get("quizzes", [])
        if not quizzes:
            print("WARN: module has no quizzes block:", mid)
            continue
        # split `questions` across quiz blocks according to each block's original count
        idx = 0
        for qz in quizzes:
            n = len(qz["questions"])
            block = questions[idx: idx + n]
            if len(block) != n:
                print(f"WARN: count mismatch in {mid}: expected {n}, got {len(block)}")
            qz["questions"] = block
            if "answers" in qz:
                del qz["answers"]
            idx += n
        if idx != len(questions):
            print(f"WARN: leftover questions not consumed in {mid}: {len(questions)-idx}")
    return modules

# ---- data/content.js ----
with open("data/content.js", encoding="utf-8") as f:
    src = f.read()
m = re.search(r"const COURSE = (\[[\s\S]*\]);\s*$", src)
header_end = m.start()
COURSE = json.loads(m.group(1))
COURSE = apply_conversion(COURSE, CLASSIC)

new_course_json = json.dumps(COURSE, ensure_ascii=False, indent=2)
new_src = src[:header_end] + "const COURSE = " + new_course_json + ";\n"
with open("data/content.js", "w", encoding="utf-8") as f:
    f.write(new_src)
print("data/content.js atualizado.")

# ---- data/lube_content.js ----
with open("data/lube_content.js", encoding="utf-8") as f:
    src2 = f.read()
m2 = re.search(r"const LUBE_COURSE = (\[[\s\S]*\]);\s*$", src2)
header_end2 = m2.start()
LUBE_MODS = json.loads(m2.group(1))
LUBE_MODS = apply_conversion(LUBE_MODS, LUBE)

new_lube_json = json.dumps(LUBE_MODS, ensure_ascii=False, indent=2)
new_src2 = src2[:header_end2] + "const LUBE_COURSE = " + new_lube_json + ";\n"
with open("data/lube_content.js", "w", encoding="utf-8") as f:
    f.write(new_src2)
print("data/lube_content.js atualizado.")

# ---- validation ----
total_q = 0
for mod in COURSE + LUBE_MODS:
    for qz in mod.get("quizzes", []):
        for q in qz["questions"]:
            total_q += 1
            assert isinstance(q, dict), f"{mod['id']}: pergunta não é dict"
            assert "options" in q and len(q["options"]) == 4, f"{mod['id']}: opções != 4"
            ids = [o["id"] for o in q["options"]]
            assert q["correct"] in ids, f"{mod['id']}: correct não está nas opções"
            assert "explanation" in q and q["explanation"], f"{mod['id']}: sem explanation"
print("Validação OK. Total perguntas MC no site:", total_q)
