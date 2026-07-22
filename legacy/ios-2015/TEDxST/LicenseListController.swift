//
//  LicenseListController.swift
//  TEDxST
//
//  Created by Kris Haamer on 08.07.15.
//  Copyright © 2015 Kris Haamer. All rights reserved.
//

import UIKit
import Bolts
import Parse
import ParseUI

class LicenseListController: PFQueryTableViewController, UIViewControllerTransitioningDelegate {
    
    let cellIdentifier:String = "LicenseCell"
    @IBOutlet weak var dismissModalBtn: UIBarButtonItem!
    
    override init(style: UITableViewStyle, className: String!) {
        super.init(style: style, className: className)
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        self.pullToRefreshEnabled = true
        self.paginationEnabled = false
        self.objectsPerPage = 30
        self.parseClassName = "Licenses"
    }
    
    override func viewDidLoad() {
        
        tableView.registerNib(UINib(nibName: cellIdentifier, bundle: nil), forCellReuseIdentifier: cellIdentifier)
        
        dismissModalBtn.target = self
        dismissModalBtn.action = "handleClose:"
    
        super.viewDidLoad()
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
    
    override func tableView(tableView: UITableView, estimatedHeightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        
        return 300.0
    }
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath, object: PFObject?) -> LicenseCell {
        
        var cell:LicenseCell? = tableView.dequeueReusableCellWithIdentifier(cellIdentifier, forIndexPath: indexPath) as? LicenseCell
        
        if(cell == nil) {
            cell = NSBundle.mainBundle().loadNibNamed(cellIdentifier, owner: self, options: nil)[0] as? LicenseCell
        }
        
        if let obj = object {

            cell?.title?.text = obj["title"] as? String
            cell?.license?.text = obj["license"]  as? String
            
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
    
    @IBAction func handleClose(b:UIBarButtonItem) {
        self.dismissViewControllerAnimated(true, completion: {})
    }

}
