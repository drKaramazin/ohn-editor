import { Component, Input, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

import { Element } from '../../models/element/element';
import { CurrentElementService } from '../../services/current-element.service';

interface ElementNode {
  expandable: boolean;
  level: number;

  slug: string;
  class: string;
  controller: string;
}

@Component({
  selector: 'app-elements-tree',
  templateUrl: './elements-tree.component.html',
  styleUrls: ['./elements-tree.component.scss']
})
export class ElementsTreeComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _element: Element;

  @Input() set element(element: Element) {
    this._element = element;
    if (this.element) {
      this.dataSource.data = [this.element];
    }
  }

  get element(): Element {
    return this._element;
  }

  treeControl = new FlatTreeControl<ElementNode>(
    node => node.level, node => node.expandable);

  hasChild = (_: number, node: ElementNode) => node.expandable;

  // tslint:disable-next-line:variable-name
  private _transformer = (node: Element, level: number) => {
    return {
      expandable: !!node.elements && node.elements.length > 0,
      level,

      slug: node.element_slug,
      class: node._cls,
      controller: node.controller,
    };
  }

  // tslint:disable:member-ordering
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.elements);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  // tslint:disable:member-ordering

  selectedElement: Element;

  constructor(
    public current: CurrentElementService,
  ) {}

  ngOnInit() {}

  getElement(source: Element, slug: string): Element {
    if (source.element_slug === slug) {
      return source;
    } else {
      if (source.elements) {
        for (const element of source.elements) {
          const target = this.getElement(element, slug);
          if (target) {
            return target;
          }
        }
      }
    }
  }

  hover(node: ElementNode) {
    this.selectedElement = this.getElement(this.element, node.slug);
  }

  leave() {
    // this.selectedElement = undefined;
  }

  click(node: ElementNode) {
    this.current.currentElement.next(this.getElement(this.element, node.slug));
  }

}
