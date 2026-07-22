//
//  TeamListController.swift
//  TEDxST
//
//  Created by Kris Haamer on 04.07.15.
//  Copyright © 2015 HAAM. All rights reserved.
//

import UIKit
import Bolts
import Parse
import ParseUI

class TeamListController: PFQueryTableViewController, UIViewControllerTransitioningDelegate {
    
    let cellIdentifier:String = "TeamCell"
    
    override init(style: UITableViewStyle, className: String!) {
        super.init(style: style, className: className)
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        self.pullToRefreshEnabled = true
        self.paginationEnabled = false
        self.objectsPerPage = 30
        self.parseClassName = "Team"
    }
    
    override func viewDidLoad() {
        
        tableView.registerNib(UINib(nibName: cellIdentifier, bundle: nil), forCellReuseIdentifier: cellIdentifier)
        tableView.backgroundView = UIImageView(image: UIImage(named: "green"))
        tableView.backgroundView?.contentMode = UIViewContentMode.ScaleAspectFill
        tableView.estimatedRowHeight = 200
        tableView.rowHeight = UITableViewAutomaticDimension
        tableView.alpha = 0
        
        super.viewDidLoad()
    }

    override func viewWillAppear(animated: Bool) {
        tableView.fadeIn()
    }
    
    override func tableView(tableView: UITableView, willDisplayCell cell: UITableViewCell, forRowAtIndexPath indexPath: NSIndexPath) {
        
        cell.layer.transform = CATransform3DMakeScale(0.1,0.1,1)
        UIView.animateWithDuration(0.25, animations: {
            cell.layer.transform = CATransform3DMakeScale(1,1,1)
        })
    }
    
    override func queryForTable() -> PFQuery {
        let query:PFQuery = PFQuery(className: self.parseClassName!)
        if (objects!.count == 0){
            query.cachePolicy = PFCachePolicy.CacheThenNetwork
        }
        
        query.whereKey("published", equalTo:true)
        query.orderByAscending("priority")
        return query
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
    }
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath, object: PFObject?) -> TeamCell {
        
        var cell:TeamCell? = tableView.dequeueReusableCellWithIdentifier(cellIdentifier, forIndexPath: indexPath) as? TeamCell
        
        if(cell == nil) {
            cell = NSBundle.mainBundle().loadNibNamed(cellIdentifier, owner: self, options: nil)[0] as? TeamCell
        }
        
        cell?.parseObject = object
        if let pfObject = object {
            
            if let name:String = pfObject["name"] as? String {
                cell?.name?.text = name
            }
            if let role:String = pfObject["role"] as? String {
                cell?.role?.text = role
            }
            if let desc:String = pfObject["desc"] as? String {
                cell?.desc?.text = desc
            }

            if(indexPath.row % 2 == 0) {
                cell?.backgroundColor = UIColor.clearColor()
            } else {
                
                cell?.backgroundColor = UIColor.blackColor().colorWithAlphaComponent(0.7)
                cell?.textLabel?.backgroundColor = UIColor.blackColor().colorWithAlphaComponent(0.8)
                cell?.detailTextLabel?.backgroundColor = UIColor.blackColor().colorWithAlphaComponent(0.7)
            }
        }
        
        return cell!
    }
}
