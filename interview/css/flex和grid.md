# flex和grid

## flex

### 父容器

*flex-direction*主轴方向: row, row-reverse, column, column-reverse. 注意，真正显示的顺序还受到dirction属性影响

*flex-wrap*子元素堆叠方向: nowrap, wrap, wrap-reverse。 换行的时候，元素在新一行的位置受到flex-direction影响

*flex-flow*是flex-dirction和flex-wrap的简写，可以将两个属性合到一起写。

*justify-content*属性定义浏览器如何分配在父容器主轴上的元素之间的空间

content-distribution: space-between|space-around|space-evenly|streth(在规范中，chrome不生效？使用flex-grow)

content-position: center | start | end | flex-start | flex-end

overflow-position: unsafe | safe

*align-items*属性定义子元素在交叉轴上的对齐方式: center, flex-start, start等

*align-content*属性设置了浏览器如何沿着伸缩盒子容器（flexbox container）的纵轴和网格容器（Grid Container）的主轴在内容项之间和周围分配空间。该属性对单行弹性盒子模型无效。（即：带有flex-wrap: nowrap）。 取值有: center, start, flex-start, space-between.

*place-content*属性是align-content和justify-content的简写

### 子容器

*order*属性规定了弹性容器中的可伸缩项目在布局时的顺序。元素按照 order 属性的值的增序进行布局。拥有相同 order 属性值的元素按照它们在源代码中出现的顺序进行布局

注意: order 仅仅对元素的视觉顺序 (visual order) 产生作用，并不会影响元素的逻辑或 tab 顺序。 order 不可以用于非视觉媒体，例如 speech。

*flex-grow*: number, 定义在有空闲空间的时候，改元素放大的量，默认为0不放大。如果多个元素，按照定义的值的比例来放大。

*flex-shrink*: number, 定义在空间不足的时候，元素缩小的比例，默认为1,表示所有的元素按照比例缩小，如果设置为0表示空间不足也不缩小。如果设置为0的元素加起来超过父容器范围，则溢出。

*flex-basis*: string, flex 元素在主轴方向上的初始大小。当一个元素同时被设置了 flex-basis (除值为 auto 外) 和 width (或者在 flex-direction: column 情况下设置了height) , flex-basis 具有更高的优先级.

*align-self*: 子元素定义自身的对齐方式, 将覆盖父元素的align-items

*flex*: 子元素简写属性，用来设置 flex-grow, flex-shrink 与 flex-basis。


## grid

*grid-template-columns*，*grid-template-rows*定义每一列的列宽和行高。

*grid-gap*: grid的间隙

*repeat*: 定义重复次数

*grid-template-areas*: 'a a a'
                       'b b b'
                       'c c c';
