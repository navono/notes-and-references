# 单独开放某个嵌套的文件夹
有以下结构的文件夹：
  - .gitignore
  - a
     - a.txt
  - b
    - b.txt
  - c
    - c1
      - c1.txt
    - c2
      - c2.txt
    - c3
      - c3.txt

现在只想监视`c\c1`文件，其他的文件夹均不监视。`gitignore`应该这样写：
> /* #忽略所有<br>
!/c #不忽略文件夹c<br>
/c/* #忽略文件夹c下的所有<br>
!/c/c1 #不忽略文件夹c/c1<br>