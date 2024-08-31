import os
import json

PATH = 'src/markdown'

# deal with blog posts
BLOGS_PATH = 'src/markdown/blogs'
blogs = {}
for path, dirs, files in os.walk(BLOGS_PATH):
    for file in files:

        with open(f'{path}/{file}', 'r') as f:

            blog_name = file[:-3]
            
            blogs[blog_name] = {}
            blogs[blog_name]['id'] = blog_name
            blogs[blog_name]['title'] = f.readline().removeprefix('# ').removesuffix('\n')
            blogs[blog_name]['author'] = f.readline().split(': ')[1].removesuffix('\n')
            blogs[blog_name]['date'] = f.readline().split(': ')[1].removesuffix('\n')
            blogs[blog_name]['order'] = f.readline().split(': ')[1].removesuffix('\n')

            f.readline()
            blogs[blog_name]['description'] = ''

            last_line = f.readline()
            while last_line != '---\n':
                blogs[blog_name]['description'] += last_line
                last_line = f.readline()
            blogs[blog_name]['description'].removesuffix('\n')

            blogs[blog_name]['content'] = f.read()
    
blogs = dict(sorted(blogs.items(), key=lambda x: x[1]['order'], reverse=True))

with open(f'{PATH}/blog.json', 'w', encoding='utf-8') as file:
    file.write(json.dumps(blogs, indent = 4))

# deal with contests
CONTESTS_PATH = 'src/markdown/contests'
contests = {}
for path, dirs, files in os.walk(CONTESTS_PATH):
    for file in files:

        with open(f'{path}/{file}', 'r', encoding='utf-8') as f:

            # convert name to camel case
            contest_name = file[:-3]
            
            
            contests[contest_name] = {}

            name = f.readline().split(': ')[1].removesuffix('\n')
            contests[contest_name]['name'] = name

            f.readline() # contest description...
            last_line = f.readline()
            text = ''
            while last_line != '# Rules\n':
                text += last_line
                last_line = f.readline()
            contests[contest_name]['contest'] = text.removeprefix('\n').removesuffix('\n')
            
            f.readline() # rules...
            last_line = f.readline()
            text = ''
            while last_line != '# Events\n':
                text += last_line
                last_line = f.readline()
            contests[contest_name]['rules'] = text.removeprefix('\n').removesuffix('\n')
            
            # rest of the file is events
            contests[contest_name]['events'] = f.read().removeprefix('\n').removesuffix('\n')

with open(f'{PATH}/contests.json', 'w', encoding='utf-8') as file:
    file.write(json.dumps(contests, indent = 4))

# deal with information
INFORMATION_PATH = 'src/markdown/information'
info = {}
for path, dirs, files in os.walk(INFORMATION_PATH):
    for file in files:

        with open(f'{path}/{file}', 'r', encoding='utf-8') as f:

            # convert name to camel case
            info_name = file[:-3]
            info_name = ''.join(['-'+i.lower() if i.isupper() 
               else i for i in info_name]).lstrip('-')
            
            info[info_name] = {}
            info[info_name]['content'] = f.read()

with open(f'{PATH}/information.json', 'w', encoding='utf-8') as file:
    file.write(json.dumps(info, indent = 4))