install:
	npm ci

link:
	npm link

unlink:
	npm unlink -g @hexlet/code

publish:
	npm publish

lint:
	npx eslint .

test-json:
	gendiff __fixtures__/file1.json __fixtures__/file2.json

test-json-plain:
	gendiff --format plain __fixtures__/file1.json __fixtures__/file2.json

test-json-json:
	gendiff --format json __fixtures__/file1.json __fixtures__/file2.json

test-yaml:
	gendiff __fixtures__/file1.yaml __fixtures__/file2.yaml

test-yaml-plain:
	gendiff --format plain __fixtures__/file1.yaml __fixtures__/file2.yaml

test-all: test-json test-json-plain test-json-json test-yaml test-yaml-plain