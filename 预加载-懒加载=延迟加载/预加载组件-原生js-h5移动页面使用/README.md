## 预加载目的
h5页面很多图片视频资源的时候另外可以对页面里用到的所有图片做预加载的处理，当用户打开页面的时候不立即显示第一屏，而是先显示资源加载效果，等到加载完毕，再来显示页面的主内容，虽然这种加载效果占用了用户的浏览时间，但是我们可以把它做的好看有趣一点，所以也不会影响用户体验。

## 实现思路

html里面的img标签和css中background-imag等都会触发浏览器去加载相关的图片，但是如果这个图片已经加载过了的话，浏览器就会直接使用这张已经加载好的图片，从而能够瞬间在页面中渲染出来。通过javascript，创建Image对象，然后把这些对象的src属性设置成要加载的图片地址也能触发浏览器加载图片，利用这一点就能实现图片预加载的功能：在页面里首先把那些用到了相关的图片的元素给藏掉，然后用js去加载图片，等到所有图片加载完毕再把藏掉的元素显示即可。不过这仅仅是一个基本的实现思路，要完成一个功能较健壮的预加载组件，还有以下三个问题：

### 进度问题

由于预加载的同时，还得做一个预加载的效果，这就需要把加载的进度实时通知到外部上下文才行。关于进度有两个实现方式，第一是已加载的数据大小/总的数据大小，第二是已加载的文件数/总的文件数，在浏览器里面，采用第一种方式是不现实的，根本没有原生的办法可以做到，所以只能采用第二种。

### 图片加载失败问题

比如说有4张图片，已经加载了50%，在加载第三张的时候出错了，该不该将进度反馈成75%呢？答案是：应该。如果不这么处理的话，进度永远无法到100%，页面主内容就没机会显示了，虽然图片加载有失败的情况，但是跟加载器没有关系，也许图片本身就不存在呢？也就是说图片加载失败不应该影响加载器的功能。

### 图片加载超时问题

图片不能加载太久，否则用户一直停留在加载效果上看不到主内容，用户的等待时间不可控制地延长，导致用户体验下降，这样就有悖加载器的初衷了。所以应该给每个图片设置一个加载的超时时间，如果在所有图片的超时时间之后，还没加载完，就应该主动放弃加载，通知外部上下文加载完毕，显示主内容。

## 使用场景

页面大的时候用，一般页面大小超过3M就该考虑使用；页面内包含数据量比较大的图片，在手机端测试能够明显看到加载缓慢的时候，可以考虑使用。

[参考项目地址](http://www.cnblogs.com/lyzg/p/5264028.html)