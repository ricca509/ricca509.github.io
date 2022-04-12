---
title: "git: rename a branch [locally and remotely]"
date: "2016-01-29T15:13:00.000Z"
description: "git: rename a branch [locally and remotely]"
publication_status: published
---

It happens to me quite a lot: I create a branch and then want to rename it to a more specific/correct name.  
If that branch has already been pushed to a remote, this operation is a bit trickier than the usual renaming.

```shell
git branch -m old_branch new_branch         # Rename branch locally    
git push origin :old_branch                 # Delete the old branch    
git push --set-upstream origin new_branch   # Push the new branch, set local branch to track the new remote
```

Enjoy!
