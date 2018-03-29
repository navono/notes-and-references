# RGB
RGB色彩的标记方式是 RGB(0~255 , 0~255, 0~255)，其中括弧内以逗号分隔的三组数值恰好是 (红, 绿, 蓝) 的色彩数值，所以数值会是 0~255 ，表示颜色值的多少。

RGB混色原就是加法混色。RGB(0, 0, 0) 也就是红, 绿, 蓝都没有，就是黑色。RGB(255, 255, 255)是红, 绿, 蓝都最大值就成了白色。RGB(255, 0, 0)就是红色。可以这样记忆：数值越小越黑暗。

# 16进制（HEX）
表示形式为“#”和6位16进制的数值，每两位数字一次代表红、绿、蓝，即 __#RRGGBB__。每位数字取值范围是 0-F 。10对应A，11对应B，12对应C，13对应D，14对应E，15对应F。

与RGB同理，0最小，F最大，#000000（可缩写成#000）是黑色，#FFF是白色，#F00是红色。

# RGB转16进制
16进制一个三原色数值等于相应RGB的三原色数值除以16，第一位是商，第二位是余数。超过9的用字母表示，10对应A，11对应B，12对应C，13对应D，14对应E，15对应F。

例如：
> RGB(169, 245, 8)
> <br>R： 169 / 16 = 10 余 9，而10对应A，即 A9
> <br>G： 245 / 16 = 15 余 5, 而15对应F，即 F5
> <br>B： 8 / 16 = 0 余 8，即 08
> <br>所以RGB(169, 245, 8) = #A9F508

# 16进制转RGB
RGB的数值是16乘以HEX的第一位加上HEX的第二位，数字10以下的RGB和HEX都是相同的，但需要在前面补0成两位数，10对应A，11对应B，12对应C，13对应D，14对应E，15对应F。

例如：
> #A9F508 = RGB(16 * 10 + 9， 16 * 15 + 5, 16 * 0 + 8) = RGB(169, 245, 8)

# JavaScript实现
# RGB 转16进制
```js
const rgbToHex = rgb => {
  // 把 x,y,z 推送到 color 数组里
  const color = rbg.toString().match(/\d+/g);
  const hex = "#";

  for (let i = 0; i < 3; i++) {
    // 'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
    // 'color[i]' 是数组，要转换成字符串.
    // 如果结果是一位数，就在前面补零。例如： A变成0A
    hex += ("0" + Number(color[i]).toString(16)).slice(-2);
  }

  return hex;
}
```

## 16进制转RGB
```js
const hexToRgb = hex => {
    let rgb = [];
    hex = hex.substr(1);  //去除前缀 # 号

    if (hex.length === 3) {
      // 处理 "#abc" 成 "#aabbcc"
      hex = hex.replace(/(.)/g, '$1$1');
    }

    hex.replace(/../g, function(color){
        rgb.push(parseInt(color, 0x10));//按16进制将字符串转换为数字
    });

    return "rgb(" + rgb.join(",") + ")";
};
```